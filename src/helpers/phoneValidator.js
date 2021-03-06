export function phoneValidator(phone) {
  const re = /^[0][5][0|2|3|4|5|6|9]{1}[-]{0,1}[0-9]{7}$/
  if (!phone || phone.length <= 0) return "Phone can't be empty."
  if (!re.test(phone)) return 'Ooops! We need a valid phone number.'
  return ''
}
