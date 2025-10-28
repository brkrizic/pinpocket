import { NextRequest, NextResponse } from 'next/server';
import { server } from '@/graphql/server';
import { createContext } from '@/graphql/context';
import { status } from '@/types/types';

export async function POST(req: NextRequest) {
  const { query, variables } = await req.json();
  const context = await createContext();

  const result = await server.executeOperation({ query, variables }, { contextValue: context });

  if(!context.userId){
    return NextResponse.json({ message: context.error }, { status: status.clientError.unauthorized })
  }

  return NextResponse.json({data: result.body?.singleResult?.data});
}
