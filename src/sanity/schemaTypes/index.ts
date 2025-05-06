import { type SchemaTypeDefinition } from 'sanity'
import { promotionCode } from './schemas/promotion-codes'
import { promotionCampaign } from './schemas/promotion-campaign'
import { productCategory } from './schemas/product-category'
import { product } from './schemas/products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,
    productCategory,
    product,

  ],
}
