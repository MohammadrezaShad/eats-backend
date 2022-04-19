import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoriesModel: Model<CategoryDocument>,
  ) {}
  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.categoriesModel
      .findOne({ slug: categorySlug })
      .exec();

    if (!category) {
      category = new this.categoriesModel({
        name: categoryName,
        slug: categorySlug,
      });
      await category.save();
    }

    return category;
  }
}
