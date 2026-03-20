// 获取 Boss 直聘聊天列表前30条

const boxes = [...document.querySelectorAll('.user-list-content > ul > li .friend-content')]
const chatLists = boxes.map(box => {
  const time = box.querySelector('.time').textContent

  const [hr, company, position] = box.querySelectorAll('.name-box > span')
  return {
    time,
    company: company.textContent,
    hr: hr.textContent,
    position: position?.textContent ?? '',
  }
})

const currnetDate = new Date().toLocaleDateString().substring(5)

const resStr = chatLists.map(chat => {
  const date = chat.time.includes(':') ? currnetDate : chat.time
  return `${date}\t${chat.company}\t${chat.hr}\t${chat.position}`
}).join('\n')
console.log(resStr)

// Copy result to clipboard
if (navigator.clipboard && navigator.clipboard.writeText) {
  navigator.clipboard.writeText(resStr).then(() => {
    console.log('✅ Chat list copied to clipboard successfully!')
  }).catch(err => {
    alert('⚠️ Failed to copy to clipboard. Please copy manually.')
    console.error('❌ Failed to copy to clipboard:', err)
  })
} else {
  // Fallback for older browsers or non-HTTPS contexts
  const textarea = document.createElement('textarea')
  textarea.value = resStr
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    console.log('✅ Chat list copied to clipboard successfully! (fallback method)')
  } catch (err) {
    alert('⚠️ Failed to copy to clipboard. Please copy manually.')
    console.error('❌ Failed to copy to clipboard:', err)
  }
  document.body.removeChild(textarea)
}
