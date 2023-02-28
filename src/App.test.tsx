import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { calculationsAPI } from './api/calculations';
import { Calculation } from './types/Calculation';

let calculations: Calculation[] = [];

const getAllMockImplementationSuccess = () => Promise.resolve(calculations);

const getAllMockImplementationError = () => Promise.reject(new Error());

const createMockImplementationSuccess = (value: string) => {
  const enteredValue = Number(value);
  let medians: number[] = [];

  switch (enteredValue) {
    case 10:
      medians = [3, 5];
      break;

    case 18:
      medians = [7];
      break;

    default:
      break;
  }

  const maxId = calculations.length
    ? Math.max(...calculations.map(({ id }) => id))
    : 0;

  const newCalculation: Calculation = {
    id: maxId + 1,
    enteredValue: enteredValue,
    medians: medians,
  };

  calculations.unshift(newCalculation)

  return Promise.resolve(newCalculation);
};

const createMockImplementationError = () => Promise.reject(new Error());

const removeAllMockImplementationSuccess = () => {
  calculations = [];

  return Promise.resolve();
};

const removeAllMockImplementationError = () => Promise.reject(new Error());

describe('The median prime number(s) getter', () => {
  let spyGetAll: jest.SpyInstance;
  let spyCreate: jest.SpyInstance;
  let spyRemoveAll: jest.SpyInstance;

  it('should render input, submit button and clear history button', () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Please, enter a number');
    const submitButton = screen.getByText(/get median/i);
    const clearHistoryButton = screen.getByText(/clear history/i);

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(clearHistoryButton).toBeInTheDocument();
  });

  it('should display input error if number is not provided', () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Please, enter a number');
    const submitButton = screen.getByText(/get median/i);

    userEvent.click(inputElement);
    userEvent.click(submitButton);

    const errorMessage = screen.getByText('You have to enter a number');

    expect(errorMessage).toBeInTheDocument();
  });

  it('should display input error if number is less than 2', () => {
    render(<App />);

    const inputElement = screen.getByLabelText('Please, enter a number');
    const submitButton = screen.getByText(/get median/i);

    userEvent.type(inputElement, "1");
    userEvent.click(submitButton);

    const errorMessage = screen.getByText(
      'Entered number must be greater than 1'
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should display warning message if history is empty', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationSuccess);

    render(<App />);

    const warningMessage = await screen.findByText(
      'History of previous calculations is empty'
    );

    expect(spyGetAll)
      .toHaveBeenCalledTimes(1);

    expect(warningMessage)
      .toBeInTheDocument();

    spyGetAll.mockRestore();
  });

  it('should display error message if unable to load the history', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationError);

    render(<App />);

    const errorMessage = await screen.findByText(
      'Can\'t load history'
    );

    expect(spyGetAll)
      .toHaveBeenCalledTimes(1);

    expect(errorMessage)
      .toBeInTheDocument();

    spyGetAll.mockRestore();
  });

  it('should create a new calculation', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationSuccess);

    spyCreate = jest.spyOn(calculationsAPI, 'createCalculation')
      .mockImplementation(createMockImplementationSuccess);

    render(<App />);

    const inputElement = screen.getByLabelText('Please, enter a number');
    const submitButton = screen.getByText(/get median/i);

    userEvent.type(inputElement, '10');
    userEvent.click(submitButton);

    const history = await screen.findAllByTestId('calculation');

    expect(spyCreate)
      .toHaveBeenCalledTimes(1);

    expect(spyCreate)
      .toHaveBeenCalledWith('10');

    expect(history)
      .toHaveLength(1);

    expect(history[0])
      .toHaveTextContent(/medians - 3,5entered number - 10/i);

    spyGetAll.mockRestore();
    spyCreate.mockRestore();
  });

  it('should display the result at the top of the history', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationSuccess);

    spyCreate = jest.spyOn(calculationsAPI, 'createCalculation')
      .mockImplementation(createMockImplementationSuccess);

    render(<App />);

    const inputElement = screen.getByLabelText('Please, enter a number');
    const submitButton = screen.getByText(/get median/i);

    userEvent.type(inputElement, '18');
    userEvent.click(submitButton);

    const history = await screen.findAllByTestId('calculation');

    expect(spyCreate)
      .toHaveBeenCalledTimes(1);

    expect(spyCreate)
      .toHaveBeenCalledWith('18');

    expect(history)
      .toHaveLength(2);

    expect(history[0])
      .toHaveTextContent(/median - 7entered number - 18/i);

    spyGetAll.mockRestore();
    spyCreate.mockRestore();
  });

  it(
    'should display error message if unable to create a calculation',
    async () => {
      spyCreate = jest.spyOn(calculationsAPI, 'createCalculation')
        .mockImplementation(createMockImplementationError);

      render(<App />);

      const inputElement = screen.getByLabelText('Please, enter a number');
      const submitButton = screen.getByText(/get median/i);

      userEvent.type(inputElement, '18');
      userEvent.click(submitButton);

      const errorMessage = await screen.findByText(
        'Unable to add a calculation'
      );

      expect(spyCreate)
        .toHaveBeenCalledTimes(1);

      expect(errorMessage)
        .toBeInTheDocument();

      spyCreate.mockRestore();
    },
  );

  it('should display loaded history of calculations', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationSuccess);

    render(<App />);

    const history = await screen.findAllByTestId('calculation');

    expect(spyGetAll)
      .toHaveBeenCalledTimes(1);

    expect(history)
      .toHaveLength(2);

    expect(history[0])
      .toHaveTextContent(/median - 7entered number - 18/i);

    spyGetAll.mockRestore();
  });

  it('should clear history when click on \'clear history\' button', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationSuccess);

    spyRemoveAll = jest.spyOn(calculationsAPI, 'deleteAllCalculations')
      .mockImplementation(removeAllMockImplementationSuccess);

    render(<App />);

    const history = await screen.findAllByTestId('calculation');

    expect(history)
      .toHaveLength(2);

    expect(history[0])
      .toHaveTextContent(/median - 7entered number - 18/i);

    const clearHistoryButton = screen.getByText(/clear history/i);

    userEvent.click(clearHistoryButton);

    const warningMessage = await screen.findByText(
      'History of previous calculations is empty'
    );

    expect(spyGetAll)
      .toHaveBeenCalledTimes(2);

    expect(warningMessage)
      .toBeInTheDocument();

    expect(spyRemoveAll)
      .toHaveBeenCalledTimes(1);

    spyGetAll.mockRestore();
    spyRemoveAll.mockRestore();
  });

  it('should display error message if unable to clear the history', async () => {
    spyGetAll = jest.spyOn(calculationsAPI, 'getCalculations')
      .mockImplementation(getAllMockImplementationSuccess);

    spyCreate = jest.spyOn(calculationsAPI, 'createCalculation')
      .mockImplementation(createMockImplementationSuccess);

    spyRemoveAll = jest.spyOn(calculationsAPI, 'deleteAllCalculations')
      .mockImplementation(removeAllMockImplementationError);

    render(<App />);

    const inputElement = screen.getByLabelText('Please, enter a number');
    const submitButton = screen.getByText(/get median/i);

    userEvent.type(inputElement, '18');
    userEvent.click(submitButton);

    const history = await screen.findAllByTestId('calculation');

    expect(history)
      .toHaveLength(1);

    const clearHistoryButton = screen.getByText(/clear history/i);

    userEvent.click(clearHistoryButton);

    const errorMessage = await screen.findByText(
      'Unable to clear history'
    );

    expect(spyRemoveAll)
      .toHaveBeenCalledTimes(1);

    expect(errorMessage)
      .toBeInTheDocument();

    spyGetAll.mockRestore();
    spyCreate.mockRestore();
    spyRemoveAll.mockRestore();
  });
});
