import mongoose from 'mongoose'
import { Book as BookSchema } from '../models/Book'
import { AccountSchema } from '../models/Account'

class DbContext {
  Books = mongoose.model('Book', BookSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
