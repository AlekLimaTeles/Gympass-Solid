import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: inMemoryCheckInsRepository
let gymsRepository: inMemoryGymsRepository
let sut: CheckInUseCase


describe('Check-in Use Case', () => {
    beforeEach(() => {
         checkInsRepository = new inMemoryCheckInsRepository()
         gymsRepository = new inMemoryGymsRepository
         sut = new CheckInUseCase(checkInsRepository, gymsRepository)

         vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check-in', async () => {
        await gymsRepository.items.push({
            id: 'gym-01',
            title: 'Acad massa',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

         await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })).rejects.toBeInstanceOf(Error)
    })
    
    it('should be able to check in twice but in diferent days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

         await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -3.702784,
            userLongitude: -38.6433024,
        })

        expect(checkIn.id).toEqual(expect.any(String))
       
    })
})