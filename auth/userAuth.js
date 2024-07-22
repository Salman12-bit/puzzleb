import bcrypt, { compare } from "bcrypt"

export const hashPassword = async (password) => {
    const saltRounds = 10;
    let hashedpassword = await bcrypt.hash(password, saltRounds)
    return hashedpassword
}

export const comparedPassword = async(password, hashedpassword) =>{
    return bcrypt.compare (password, hashedpassword)
}