import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { CategoryModel } from '@/app/events/models/CategoryModel'

class CategoryService extends ApiBaseService<CategoryModel> {
  constructor() {
    super('/categoryevent')
  }
}

export default new CategoryService()
