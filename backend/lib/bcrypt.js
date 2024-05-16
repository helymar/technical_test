import bcrypt from 'bcryptjs';

export function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

export function comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
}
