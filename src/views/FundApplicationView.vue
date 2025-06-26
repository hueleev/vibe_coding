<template>
  <div class="fund-bg">
    <div class="fund-card">
      <h2 class="form-title-main">상조회비 신청</h2>
      <form class="fund-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="name">이름</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            :placeholder="'이름을 입력하세요'"
          />
        </div>
        <div class="form-group">
          <label for="department">부서</label>
          <input
            id="department"
            v-model="form.department"
            type="text"
            required
            :placeholder="'부서를 입력하세요'"
          />
        </div>
        <div class="form-group">
          <label for="eventType">경조항목</label>
          <select id="eventType" v-model="form.eventType" required>
            <option value="">경조항목을 선택하세요</option>
            <option value="결혼">결혼</option>
            <option value="출산">출산</option>
            <option value="장례">장례</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div class="form-group">
          <label for="amount">금액</label>
          <input
            id="amount"
            :value="displayAmount"
            @input="displayAmount = $event.target.value"
            type="text"
            readonly
            :placeholder="'금액이 자동 입력됩니다'"
          />
        </div>
        <div class="form-group">
          <label for="bank">은행명</label>
          <input
            id="bank"
            v-model="form.bank"
            type="text"
            required
            :placeholder="'은행명을 입력하세요'"
          />
        </div>
        <div class="form-group">
          <label for="account">계좌번호</label>
          <input
            id="account"
            v-model="form.account"
            type="text"
            required
            :placeholder="'계좌번호를 입력하세요'"
          />
        </div>
        <div class="form-group">
          <label for="file">첨부파일</label>
          <input id="file" type="file" @change="onFileChange" />
        </div>
        <button type="submit" class="submit-btn">제출하기</button>
      </form>
    </div>
    <footer class="footer">
      <div>회장: 홍길동 | 010-1234-5678</div>
      <div>총무: 김철수 | 010-9876-5432</div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

const form = ref({
  name: '',
  department: '',
  eventType: '',
  amount: '',
  bank: '',
  account: '',
  file: null as File | null,
})

// 금액 표시용 computed
const displayAmount = computed({
  get() {
    if (!form.value.amount) return ''
    return Number(form.value.amount).toLocaleString()
  },
  set(val: string) {
    // 쉼표 제거 후 숫자만 저장
    form.value.amount = val.replace(/[^0-9]/g, '')
  },
})

watch(
  () => form.value.eventType,
  (val) => {
    switch (val) {
      case '결혼':
      case '장례':
        form.value.amount = '1000000'
        break
      case '출산':
        form.value.amount = '500000'
        break
      case '기타':
        form.value.amount = '10000'
        break
      default:
        form.value.amount = ''
    }
  },
)

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.value.file = target.files[0]
  }
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function onSubmit() {
  let fileBase64 = ''
  if (form.value.file) {
    fileBase64 = await toBase64(form.value.file)
  }
  const payload = {
    name: form.value.name,
    department: form.value.department,
    eventType: form.value.eventType,
    amount: form.value.amount,
    bank: form.value.bank,
    account: form.value.account,
    fileName: form.value.file ? form.value.file.name : '',
    fileBase64: fileBase64,
  }
  const url = window.location.href.includes('localhost')
    ? '/api'
    : 'https://script.google.com/macros/s/AKfycbxH0-mjoVuzkQGCxcTR9pO-NWNldwbZgtV3uFWaFIXaEaxVeaOPEiey2gOSSjuuqIjWyQ/exec'
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      alert('신청폼이 전송되었습니다!')
      return
    } else {
      alert('신청폼 전송을 실패하였습니다!')
    }
  } catch {
    alert('서버 오류! 다시 시도해 주세요.')
  }
}
</script>

<style scoped>
.fund-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: #7052ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  padding-bottom: 60px;
  z-index: 0;
  box-sizing: border-box;
}
.fund-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 40px;
  box-shadow: 0px 24px 40px 8px rgba(0, 0, 0, 0.3);
  width: 80%;
  max-width: 900px;
  min-width: 0;
  min-height: 0;
  max-height: 100vh;
  padding: 48px 5vw 36px 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
}
.fund-card::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.form-title-main {
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #676083;
  margin-bottom: 32px;
  text-align: center;
}
.fund-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #676083;
  margin-bottom: 2px;
}
input[type='text'],
input[type='number'],
select,
input[type='file'],
input[type='email'] {
  border: 2px solid #d9d9f2;
  border-radius: 28px;
  background: #f9fafb;
  padding: 14px 18px;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  transition: border 0.2s;
}
input[type='text']:focus,
input[type='number']:focus,
select:focus {
  border: 2px solid #7052ed;
  outline: none;
}
input[readonly] {
  background: #faedf2;
  color: #b0b0b0;
}
select {
  background: #f2edfa;
}
.submit-btn {
  background: #facc4d;
  color: #803366;
  border: 2px solid #f2b233;
  border-radius: 30px;
  padding: 16px 0;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  margin-top: 10px;
  transition:
    background 0.2s,
    color 0.2s;
}
.submit-btn:hover {
  background: #f2b233;
  color: #fff;
}
.footer {
  width: 100vw;
  background: #f3f4f6;
  color: #222;
  text-align: center;
  padding: 18px 0 12px 0;
  font-size: 1rem;
  border-top: 1px solid #e5e7eb;
  position: fixed;
  left: 0;
  bottom: 0;
}
@media (max-width: 900px) {
  .fund-bg {
    padding-bottom: 80px;
  }
  .fund-card {
    width: 98vw;
    max-width: 98vw;
    padding: 28px 16px;
  }
  .form-title-main {
    font-size: 1.3rem;
  }
  .footer {
    font-size: 0.95rem;
    padding: 12px 0 8px 0;
  }
}
</style>
