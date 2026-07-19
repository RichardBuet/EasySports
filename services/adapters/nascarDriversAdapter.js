export function adaptNascarDrivers(data) {

    return data.response.map(driver => ({

        driverId: driver.Nascar_Driver_ID,

        driver: driver.Full_Name,

        firstName: driver.First_Name,

        lastName: driver.Last_Name,

        team: driver.Team,

        manufacturer: driver.Manufacturer,

        badge: driver.Badge_Image,

        image: driver.Image,

        imageSmall: driver.Image_Small,

        firesuit: driver.Firesuit_Image,

        hometown: {
            city: driver.Hometown_City,
            state: driver.Hometown_State,
            country: driver.Hometown_Country
        },

        crewChief: driver.Crew_Chief,

        rookieYear: driver.Rookie_Year_Series_1,

        birthDate: driver.DOB,

        twitter: driver.Twitter_Handle,

        driverPage: driver.Driver_Page,

        series: driver.Driver_Series

    }));

}
