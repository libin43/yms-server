import { AuthenticationError } from "@nestjs/apollo"
import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

export const Roles = createParamDecorator((authorizedRoles: string[], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    console.log(authorizedRoles, 'authorizedRoles')

    const { req } = ctx.getContext()

    const requestedRole = req?.user?.payload?.role
    console.log(requestedRole, 'requested role')

    if (!requestedRole) throw new AuthenticationError('Invalid role')

    const hasPermission = authorizedRoles.some((role) => requestedRole.includes(role))

    if (!hasPermission) throw new UnauthorizedException('Permission denied')

    return hasPermission
})
