import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BooksService {
  async create(rawData) {
    const data = await dbContext.Books.create(rawData)
    return data
  }

  async getAll(userEmail) {
    return await dbContext.Books.find({ creatorEmail: userEmail })
  }

  async getById(id, userEmail) {
    const value = await dbContext.Books.findOne({ _id: id, creatorEmail: userEmail })
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }

  async deleteBook(id, email) {
    const data = await dbContext.Books.findOneAndRemove({ _id: id, creatorEmail: email })
    if (!data) {
      throw new BadRequest('Invalid ID or you do not own this list')
    }
  }

  async editBook(id, userEmail, update) {
    const data = await dbContext.Books.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update)
    if (!data) {
      throw new BadRequest('Invalid ID or you do not own this list.')
    }
    return data
  }
}

export const booksService = new BooksService()
