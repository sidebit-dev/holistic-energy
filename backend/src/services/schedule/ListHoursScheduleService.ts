import prismaClient from "../../prisma";

interface HoursScheduletRequest {
    therapist_id: string;
    therapy_id: string;
    dataSchedule: string;
}

class ListHoursScheduleService {
  async execute({therapist_id, therapy_id, dataSchedule}: HoursScheduletRequest) {

    const data = new Date(dataSchedule) 

  //  console.log(therapist_id, therapy_id, data)

    const hoursSchedule = await prismaClient.schedule.findMany({
        where:{
            therapy_id: therapy_id,
            AND: {
                thepapist_id: therapist_id,
                AND: {
                    scheduleDate: data
                }
            }           
        },
        
        orderBy:{
           hour:{
            hour: 'asc'
           }
        },   
        select:{
            therapy:{
                select:{
                    id: true,
                    name: true
                }
            },
            therapist:{                
                select:{
                    user:{
                        select:{
                            id: true,
                            name: true
                        }
                    }

                }
            },            
            scheduleDate: true,
            hour:{
                select:{
                    id: true,
                    hour: true
                }
            }
                        
        } 
    });

    let hours = []

    for (let index = 0; index < hoursSchedule.length; index++) {
        const element = hoursSchedule[index].hour.hour;
        hours.push(element)
    }

    // const hours = hoursSchedule[0].hour.hour
    // console.log(hours)

    return [hoursSchedule, hours];
  }
}

export { ListHoursScheduleService };
