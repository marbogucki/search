export const removeItem = <T>(dataList: T[], dataItem: T) => {
  return dataList.filter((item: T) => item['id'] !== dataItem['id']);
};
