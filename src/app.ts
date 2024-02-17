import fastify from "fastify";
import { ZodError } from 'zod';
import { usersRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from '@fastify/cookie'
import { checkinsRoutes } from "./http/controllers/check-ins/routes";


export const app = fastify()


app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkinsRoutes)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m',
    }
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})



