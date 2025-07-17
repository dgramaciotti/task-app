import z from 'zod'

export const isValidUuid = (uuid: string) => {
  const schema = z.uuid()
  const result = schema.safeParse(uuid)
  return result.success
}
