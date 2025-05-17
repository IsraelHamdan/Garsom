/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

async function checkPrismaSchema() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    await prisma.$connect();

    console.log('Conexão com o banco de dados estabelecida');
    console.log('Modelos disponíveis no PrismaClient:', Object.keys(prisma));

    // Verificar se o modelo 'table' existe
    if (prisma['table']) {
      console.log('Modelo table está disponível');

      // Tentar uma consulta simples para verificar se o modelo funciona
      try {
        const count = await prisma.table.count();
        console.log(`Número de registros na tabela: ${count}`);
      } catch (queryError) {
        console.error('Erro ao consultar o modelo table:', queryError);
      }
    } else {
      console.error('ERRO: Modelo table NÃO está disponível no PrismaClient');

      // Verificar se há algum problema com o nome do modelo
      console.log('Procurando por modelos com nomes similares...');

      // Lista todos os modelos disponíveis para debug
      const models = Object.keys(prisma).filter(
        (key) =>
          !key.startsWith('$') &&
          typeof prisma[key] === 'object' &&
          prisma[key] !== null,
      );

      console.log('Todos os modelos disponíveis:', models);
    }
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute a função
checkPrismaSchema()
  .then(() => console.log('Verificação concluída'))
  .catch((e) => console.error('Erro durante a verificação:', e));
