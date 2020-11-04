import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;

  date: Date;
}

// Um service só pode ter um único método
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentsDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentsDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentsDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
