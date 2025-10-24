export interface DecodedToken {
  role: string;
  id: string;
  email?: string;
  exp?: number;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    // JWT é composto por: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error("❌ Token inválido: formato incorreto");
      return null;
    }

    const payload = parts[1];
    const decoded = JSON.parse(
      Buffer.from(payload, 'base64').toString('utf-8')
    );

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.error("❌ Token expirado");
      return null;
    }

    return {
      role: decoded.role,
      id: decoded.sub || decoded.id || decoded.userId,
      email: decoded.email,
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("❌ Erro ao decodificar token:", error);
    return null;
  }
}