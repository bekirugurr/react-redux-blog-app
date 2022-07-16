export const elapsedTime = (date) =>{

  const theDate = new Date(date)
  const now = new Date()
  
  const elapsedYears = now.getFullYear() - theDate.getFullYear()
  const elapsedMonths = now.getMonth() - theDate.getMonth()
  const elapsedDays = now.getDate() - theDate.getDate()
  const elapsedHours = now.getHours() - theDate.getHours()
  const elapsedMinutes = now.getMinutes() - theDate.getMinutes()

  if (elapsedYears) {
    if(elapsedYears == 1){
      return `1 year`
    }else{
      return `${elapsedYears} years`
    }
  } else if(elapsedMonths) {
    if(elapsedMonths == 1){
      return `1 month`
    }else{
      return `${elapsedMonths} months`
    }
  } else if(elapsedDays){
    if(elapsedDays >= 14){
      return `${Math.floor(elapsedDays/7)} weeks`
    }else if(elapsedDays >= 7){
      return `1 week`
    }else if(elapsedDays == 1){
      return '1 day'
    }else{
      return`${elapsedDays} days`
    }
  }else if(elapsedHours){
    if(elapsedHours == 1){
      return '1 hour'
    }else {
      return `${elapsedHours} hours` 
    }
  }else if(elapsedMinutes > 1){
    return `${elapsedMinutes} minutes`
  }else{
    return '1 minute'
  }
}



export const determinePostCategory = (category) => {

switch (category) {
  case 1:
    return "Software"
  case 2:
    return "Book"
  case 3:
    return "Movie"
  case 4:
    return "Life"

  case 5:
    return "Personal"
  default:
    return "Life"
}}

export const determineCategoryColor = (category) => {
switch (category) {
  case 1:
    return '#E81970';
  case 2:
    return '#07c878';
  case 3:
    return '#890596';
  case 4:
    return '#290FBA';
  case 5:
    return '#FFC107';
  default:
    return '#290FBA';
}}

