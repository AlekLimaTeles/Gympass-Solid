import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseRequest {

}

type AuthenticateUseCaseResponse = void

export class AuthenticateUseCase {
    constructor(
        private userRepository: UsersRepository,
    ) {}


    async execute({ 
        email, 
        password 
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }
    } 
        
   
}