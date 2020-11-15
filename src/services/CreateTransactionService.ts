import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: CreateTransactionDTO): Transaction {
    const transactionProblem =
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total < value;

    if (transactionProblem) {
      throw Error(`Impossible outcome this much`);
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
