import { buildSchemaFromTypeDefinitions } from "graphql-tools";
import { isError } from "util";

async function signup(root, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: isError.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(root, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if(!user) {
        throw new Error('No such user found')
    }
}