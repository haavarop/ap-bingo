import {defineField} from 'sanity'

export default defineField({
  type: 'document',
  title: 'Bingo',
  name: 'bingo',
  fields: [
    {
      name: 'bingoList',
      title: 'Inngold',
      description: 'Begrep som dukker opp i spillerne sin liste',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
})
