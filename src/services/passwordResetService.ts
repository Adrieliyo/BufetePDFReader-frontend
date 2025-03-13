// import { fetchData } from "./api";

// /**
//  * Solicita un código de recuperación de contraseña
//  * @param email Correo electrónico del usuario
//  */
// export async function requestPasswordReset(email: string) {
//   return fetchData("password/request-reset", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email }),
//   });
// }

// /**
//  * Verifica un código de recuperación de contraseña
//  * @param email Correo electrónico del usuario
//  * @param code Código de verificación
//  */
// export async function verifyResetCode(email: string, code: string) {
//   return fetchData("password/verify-code", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, code }),
//   });
// }

// /**
//  * Restablece la contraseña del usuario
//  * @param email Correo electrónico del usuario
//  * @param code Código de verificación
//  * @param newPassword Nueva contraseña
//  */
// export async function resetPassword(email: string, code: string, newPassword: string) {
//   return fetchData("password/reset", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ 
//       email, 
//       code, 
//       new_password: newPassword 
//     }),
//   });
// }

import { fetchData } from "./api";

/**
 * Solicita un código de recuperación de contraseña
 * @param email Correo electrónico del usuario
 */
export async function requestPasswordReset(email: string) {
  try {
    return await fetchData("password/request-reset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    // Transformar errores conocidos
    if (error instanceof Error) {
      if (error.message.includes('Ya tienes un código')) {
        throw new Error('Ya tienes un código de recuperación vigente. Revisa tu correo o espera a que expire.');
      }
      if (error.message.includes('excedido')) {
        throw new Error('Has excedido el número máximo de intentos. Intenta nuevamente en 24 horas.');
      }
    }
    throw error;
  }
}

/**
 * Verifica un código de recuperación de contraseña
 * @param email Correo electrónico del usuario
 * @param code Código de verificación
 */
export async function verifyResetCode(email: string, code: string) {
  try {
    return await fetchData("password/verify-code", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code }),
    });
  } catch (error) {
    // Transformar errores conocidos
    if (error instanceof Error && error.message.includes('inválido')) {
      throw new Error('El código ingresado no es válido o ha expirado. Solicita un nuevo código.');
    }
    throw error;
  }
}

/**
 * Restablece la contraseña del usuario
 * @param email Correo electrónico del usuario
 * @param code Código de verificación
 * @param newPassword Nueva contraseña
 */
export async function resetPassword(email: string, code: string, newPassword: string) {
  try {
    return await fetchData("password/reset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email, 
        code, 
        new_password: newPassword 
      }),
    });
  } catch (error) {
    // Transformar errores conocidos
    if (error instanceof Error) {
      if (error.message.includes('inválido') || error.message.includes('expirado')) {
        throw new Error('El código ya no es válido. Por favor, inicia el proceso nuevamente.');
      }
    }
    throw error;
  }
}