export const getProvinces = async () => {
    try {
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      return await response.json();
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return [];
    }
  };
  
  export const getDistricts = async (provinceId) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`);
      const data = await response.json();
      return data.districts || [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  };
  
  export const getWards = async (districtId) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`);
      const data = await response.json();
      return data.wards || [];
    } catch (error) {
      console.error('Error fetching wards:', error);
      return [];
    }
  };
  