import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}
