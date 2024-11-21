import { fetchProvinces, fetchDistricts, fetchWards } from '../models/Province';

export const getProvinces = async () => {
  return await fetchProvinces();
};

export const getDistricts = async (provinceId) => {
  return await fetchDistricts(provinceId);
};

export const getWards = async (districtId) => {
  return await fetchWards(districtId);
};
