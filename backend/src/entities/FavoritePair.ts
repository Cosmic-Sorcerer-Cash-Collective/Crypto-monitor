import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity({ name: 'favoritePair' })
export class FavoritePairEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    pair: string
}
