import prisma from "../server/prisma";
import { getJsonData } from "./utils";

export async function createRegion() {
  let data = await getJsonData("id-region");
  let country = await prisma.dataCountry.create({
    data: {
      name: "Indonesia"
    }
  });
  let uMap = (i: { name?: any; longitude?: any; latitude?: any }) => ({
    name: "".concat(i.name),
    lng: "".concat(i.longitude || null),
    lat: "".concat(i.latitude || null)
  });
  for (let prov of data) {
    let province = await prisma.dataProvince.create({
      data: { ...uMap(prov), countryId: country.id }
    });
    for (let cit of prov.regencies) {
      let city = await prisma.dataCity.create({
        data: { ...uMap(cit), provinceId: province.id }
      });
      for (let dis of cit.districts) {
        let district = await prisma.dataDistrict.create({
          data: { ...uMap(dis), cityId: city.id }
        });
        for (let vil of dis.villages) {
          await prisma.dataVillage.create({
            data: { ...uMap(vil), districtId: district.id }
          });
        }
      }
    }
  }
}
async function main() {
  await createRegion();
}

main().catch((e) => {
  throw e;
});
