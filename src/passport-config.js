import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { dbSettings } from './database/connection';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'aaa20989a093bec2e1a3d13c3b1fbd9bbcd2f9df158da4ff32447ef69162cac3322a3a6342ce7ad51b8eb9b8c756d7f2c0c4b9bfca5c40d165f36d472eb6e285',
};

passport.use(new Strategy(options, async (jwt_payload, done) => {
  try {
    // Aquí puedes realizar la verificación del usuario, por ejemplo, consultando la base de datos
    // y comprobando si el usuario asociado al JWT existe y está autorizado

    // Si el usuario existe y está autorizado:
    return done(null, jwt_payload);

    // Si el usuario no existe o no está autorizado:
    // return done(null, false);
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return done(error, false);
  }
}));

export default passport;
