interface JwtPayload {
  sub?: string;
  userId?: string;
  email: string;
  // Outras propriedades que possam existir no payload
}
