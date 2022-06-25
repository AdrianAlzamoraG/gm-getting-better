import { Name } from '../../../value-objects/name.value';
import { Email } from '../../../../value-objects/email.value';
import { Password } from '../../../../value-objects/password.value';
import { NameCoach } from '../../../../../../coaches/domain/value-objects/namecoach.value';

export interface CreateFromParams {
  //Common
  email?: Email;
  password?: Password;

  //Applicant
  name?: Name;
  mySpecialty?: string;
  myExperience?: string;
  description?: string;
  nameGithub?: string;
  imgApplicant?: string;

  //Organization
  nameCoach?: NameCoach;
  descriptionCoach?: string;
  imgCoach?: string;
}
