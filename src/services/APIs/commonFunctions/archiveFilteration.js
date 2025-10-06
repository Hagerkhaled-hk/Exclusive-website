

export function archiveProductsFilteration(data,isUser)
{
    console.log(data);
    isUser?
data=data.filter((item)=>item.categoryName.includes("##ARCHIVE")===false)
:data.map((item)=>{
    let isInclude =item.categoryName.includes("##ARCHIVE")
 item.categoryName =  isInclude?item.categoryName.split("##ARCHIVE")[0]:item.categoryName} );



return data

}
export function archiveCategoryFilteration(data,isUser)
{
data=data.filter((item)=>item.name.includes("##ARCHIVE")===false) 

return data;

}
