import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentServices';

describe('CreateAppointment', () => {
  it('should be able to create new appointment', async () => {
    const fakeappointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeappointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1232323',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1232323');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeappointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeappointmentsRepository,
    );

    const appointmentDate = new Date(2020, 11, 5, 17);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1232323',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1232323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
