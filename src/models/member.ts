import { createSchema, Type, typedModel } from 'ts-mongoose'
 
const MemberSchema = createSchema({
    parentId: Type.string(),
    email: Type.string({ unique: true, lowercase: true, trim: true, required: true }),
    username: Type.string({ unique: true, lowercase: true, required: true }),
    password: Type.string({ required: true }),
    salt: Type.string({ required: true }),
    firstName: Type.string({ required: true, trim: true }),
    lastName: Type.string({ required: true, trim: true }),
    active: Type.boolean(),
    registrationDate: Type.date(),
    resetPasswordKey: Type.string()
})

const Member = typedModel('member', MemberSchema)
export { Member, MemberSchema }