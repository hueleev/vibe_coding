<template>
  <div class="fund-bg bg-gradient-to-tr from-pink-100 via-violet-100 to-yellow-50">
    <Card class="fund-card shadow-2xl bg-white/90 rounded-3xl border-0">
      <CardHeader class="flex flex-col items-center gap-2 pb-0">
        <CardTitle class="form-title-main text-violet-500">✨ 상조회 경조금 신청 ✨</CardTitle>
      </CardHeader>
      <CardContent>
        <form class="fund-form space-y-6" @submit.prevent="onSubmit">
          <div class="form-group relative">
            <IconUser
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-pink-300 pointer-events-none"
            />
            <Input
              id="name"
              v-model="form.name"
              type="text"
              required
              :placeholder="'이름을 입력하세요'"
              class="pl-14 h-12 bg-pink-50 border-pink-200 focus:border-violet-300"
            />
          </div>
          <div class="form-group relative">
            <IconDepartment
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-yellow-300 pointer-events-none"
            />
            <Input
              id="department"
              v-model="form.department"
              type="text"
              required
              :placeholder="'부서를 입력하세요'"
              class="pl-14 h-12 bg-yellow-50 border-yellow-200 focus:border-violet-300"
            />
          </div>
          <div class="form-group relative">
            <IconGift
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-pink-300 pointer-events-none"
            />
            <Select v-model="form.eventCategory" class="w-full">
              <SelectTrigger
                id="eventCategory"
                required
                class="pl-14 h-12 bg-violet-50 border-violet-200 focus:border-pink-200"
              >
                <SelectValue placeholder="상위 경조항목을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="결혼">결혼</SelectItem>
                <SelectItem value="회갑">회갑</SelectItem>
                <SelectItem value="고희">고희</SelectItem>
                <SelectItem value="칠순">칠순</SelectItem>
                <SelectItem value="팔순">팔순</SelectItem>
                <SelectItem value="구순">구순</SelectItem>
                <SelectItem value="사망">사망</SelectItem>
                <SelectItem value="위로금">위로금</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="form-group relative">
            <IconList
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-violet-400 pointer-events-none"
            />
            <Select v-model="form.eventType" class="w-full">
              <SelectTrigger
                id="eventType"
                required
                class="pl-14 h-12 bg-pink-50 border-pink-200 focus:border-violet-200"
              >
                <SelectValue placeholder="하위 경조항목을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="item in filteredEventTypes"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="form-group relative">
            <IconMoney
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-yellow-300 pointer-events-none"
            />
            <Input
              id="amount"
              :model-value="displayAmount"
              @update:modelValue="onAmountInput"
              type="text"
              readonly
              :placeholder="'금액이 자동 입력됩니다'"
              class="pl-14 h-12 bg-yellow-50 border-yellow-200 focus:border-violet-300"
            />
          </div>
          <div class="form-group relative">
            <IconBank
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-violet-400 pointer-events-none"
            />
            <Input
              id="bank"
              v-model="form.bank"
              type="text"
              required
              :placeholder="'은행명을 입력하세요'"
              class="pl-11 h-12 bg-violet-50 border-violet-200 focus:border-pink-200"
            />
          </div>
          <div class="form-group relative">
            <IconCard
              class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-pink-300 pointer-events-none"
            />
            <Input
              id="account"
              v-model="form.account"
              type="text"
              required
              :placeholder="'계좌번호를 입력하세요'"
              class="pl-11 h-12 bg-pink-50 border-pink-200 focus:border-violet-300"
            />
          </div>
          <div class="form-group relative">
            <IconFile class="absolute left-4 top-1/3 -translate-y-1/2 w-6 h-6 text-violet-400" />
            <Input
              id="file"
              type="file"
              @change="onFileChange"
              required
              class="pl-11 h-12 bg-violet-50 border-violet-200"
            />
            <div class="helper-text text-xs text-violet-400 ml-2 mt-1">{{ helperText }}</div>
          </div>
          <CardFooter class="p-0 pt-2">
            <Button
              type="submit"
              class="w-full bg-gradient-to-r from-pink-200 via-violet-200 to-yellow-100 text-violet-600 shadow-lg hover:from-violet-200 hover:to-pink-100 rounded-2xl py-6 text-lg font-bold"
            >
              제출하기
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-person">
          <span class="footer-role">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              style="vertical-align: middle; margin-right: 2px"
            >
              <circle cx="10" cy="7" r="4" fill="#1976d2" />
              <ellipse cx="10" cy="15.5" rx="7" ry="4.5" fill="#b3ddff" />
            </svg>
            회장
          </span>
          <span class="footer-name">홍길동</span>
          <span class="footer-sep">|</span>

          <span class="footer-email">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              style="vertical-align: middle; margin-right: 2px"
            >
              <rect
                x="3"
                y="5"
                width="14"
                height="10"
                rx="2"
                stroke="#1976d2"
                stroke-width="1.5"
                fill="none"
              />
              <path d="M3 5l7 6 7-6" stroke="#1976d2" stroke-width="1.5" fill="none" />
            </svg>
            president@email.com
          </span>
        </div>
        <div class="footer-person">
          <span class="footer-role">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              style="vertical-align: middle; margin-right: 2px"
            >
              <circle cx="10" cy="7" r="4" fill="#1976d2" />
              <ellipse cx="10" cy="15.5" rx="7" ry="4.5" fill="#b3ddff" />
            </svg>
            총무
          </span>
          <span class="footer-name">김철수</span>
          <span class="footer-sep">|</span>

          <span class="footer-email">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              style="vertical-align: middle; margin-right: 2px"
            >
              <rect
                x="3"
                y="5"
                width="14"
                height="10"
                rx="2"
                stroke="#1976d2"
                stroke-width="1.5"
                fill="none"
              />
              <path d="M3 5l7 6 7-6" stroke="#1976d2" stroke-width="1.5" fill="none" />
            </svg>
            manager@email.com
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import IconUser from '@/components/icons/IconUser.vue'
import IconDepartment from '@/components/icons/IconDepartment.vue'
import IconGift from '@/components/icons/IconGift.vue'
import IconList from '@/components/icons/IconList.vue'
import IconMoney from '@/components/icons/IconMoney.vue'
import IconBank from '@/components/icons/IconBank.vue'
import IconCard from '@/components/icons/IconCard.vue'
import IconFile from '@/components/icons/IconFile.vue'

const eventTypeOptions = {
  결혼: [
    { value: '결혼-본인', label: '본인', amount: 1000000 },
    { value: '결혼-자녀', label: '자녀', amount: 500000 },
  ],
  회갑: [
    { value: '회갑-부모', label: '부모', amount: 500000 },
    { value: '회갑-배우자부모', label: '배우자부모', amount: 500000 },
  ],
  고희: [
    { value: '고희-부모', label: '부모', amount: 500000 },
    { value: '고희-배우자부모', label: '배우자부모', amount: 500000 },
  ],
  칠순: [
    { value: '칠순-부모', label: '부모', amount: 500000 },
    { value: '칠순-배우자부모', label: '배우자부모', amount: 500000 },
  ],
  팔순: [
    { value: '팔순-부모', label: '부모', amount: 500000 },
    { value: '팔순-배우자부모', label: '배우자부모', amount: 500000 },
  ],
  구순: [
    { value: '구순-부모', label: '부모', amount: 500000 },
    { value: '구순-배우자부모', label: '배우자부모', amount: 500000 },
  ],
  사망: [
    { value: '사망-본인', label: '본인', amount: 2000000 },
    { value: '사망-부모', label: '부모', amount: 2000000 },
    { value: '사망-배우자부모', label: '배우자부모', amount: 700000 },
    { value: '사망-배우자', label: '배우자', amount: 700000 },
    { value: '사망-자녀', label: '자녀', amount: 700000 },
  ],
  위로금: [
    { value: '위로금-재해위로금', label: '재해위로금 (천재지변)', amount: 700000 },
    {
      value: '위로금-휴직위로금',
      label: '휴직위로금 (병고로 인하여 1개월이상 장기입원)',
      amount: 700000,
    },
  ],
  기타: [
    { value: '기타-자녀첫돌', label: '자녀 첫돌', amount: 400000 },
    { value: '기타-출산축하', label: '출산 축하', amount: 300000 },
  ],
}

const form = ref({
  name: '',
  department: '',
  eventCategory: '', // 상위 경조항목
  eventType: '', // 하위 경조항목
  amount: '',
  bank: '',
  account: '',
  file: null as File | null,
})

const filteredEventTypes = computed(() => {
  const options = eventTypeOptions as Record<
    string,
    { value: string; label: string; amount: number }[]
  >
  return form.value.eventCategory && options[form.value.eventCategory]
    ? options[form.value.eventCategory]
    : []
})

const displayAmount = computed({
  get() {
    if (!form.value.amount) return ''
    return Number(form.value.amount).toLocaleString()
  },
  set(val: string) {
    form.value.amount = val.replace(/[^0-9]/g, '')
  },
})

watch(
  () => form.value.eventType,
  (val) => {
    // 하위 경조항목이 바뀌면 금액 자동 변경
    for (const group of Object.values(eventTypeOptions)) {
      const found = group.find((item) => item.value === val)
      if (found) {
        form.value.amount = String(found.amount)
        return
      }
    }
    form.value.amount = ''
  },
)

watch(
  () => form.value.eventCategory,
  () => {
    form.value.eventType = ''
  },
)

function onAmountInput(val: string | number) {
  displayAmount.value = String(val)
}

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

const helperTextMap: Record<string, string> = {
  '': '-',
  '결혼-본인': '청첩장',
  '결혼-자녀': '청첩장',
  '회갑-부모': '가족관계증명서',
  '회갑-배우자부모': '가족관계증명서',
  '고희-부모': '가족관계증명서',
  '고희-배우자부모': '가족관계증명서',
  '칠순-부모': '가족관계증명서',
  '칠순-배우자부모': '가족관계증명서',
  '팔순-부모': '가족관계증명서',
  '팔순-배우자부모': '가족관계증명서',
  '구순-부모': '가족관계증명서',
  '구순-배우자부모': '가족관계증명서',
  '사망-본인': '주민등록등본',
  '사망-부모': '가족관계증명서',
  '사망-배우자부모': '가족관계증명서',
  '사망-배우자': '주민등록등본',
  '사망-자녀': '주민등록등본',
  '위로금-재해위로금': '-',
  '위로금-휴직위로금': '-',
  '기타-자녀첫돌':
    '주민등록등본 (경조금을 기지급 받은 자녀의 수에 제한을 두지 않으며, 쌍둥이의 경우 아이 수에 비례하여 지급)',
  '기타-출산축하': '주민등록등본 (직계 가족을 낳았을 때 아이 수에 비례하여 지급)',
}

const helperText = computed(() => {
  return `증명 문서: ${helperTextMap[form.value.eventType]}`
})

async function onSubmit() {
  let fileBase64 = ''
  if (form.value.file) {
    fileBase64 = await toBase64(form.value.file)
  }
  const payload = {
    name: form.value.name,
    department: form.value.department,
    eventCategory: form.value.eventCategory,
    eventType: form.value.eventType,
    amount: form.value.amount,
    bank: form.value.bank,
    account: form.value.account,
    fileName: form.value.file ? form.value.file.name : '',
    fileBase64: fileBase64,
  }

  try {
    const response = await fetch('/api', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
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
  background: #bbccff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  padding-bottom: 90px;
  z-index: 0;
  box-sizing: border-box;
}
.fund-card {
  background: #ffffff;
  border-radius: 40px;
  box-shadow:
    0 4px 24px 0 #b6c7ff66,
    0 1.5px 8px 0 #a97fff33,
    0 12px 32px 0 #b6c7ff22,
    0 0.5px 1.5px 0 #fff;
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
  color: #727272;
  margin-bottom: 32px;
  text-align: center;
}
.fund-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #b48be3;
  margin-bottom: 2px;
}
input[type='text'],
input[type='number'],
select,
input[type='file'],
input[type='email'] {
  border: 2px solid #f7d8ff;
  border-radius: 28px;
  background: #fafffd;
  padding: 14px 18px 14px 49px;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  transition: border 0.2s;
  color: #7d5fa6;
}
input[type='file']::file-selector-button {
  display: none;
}
input[type='file']::-webkit-file-upload-button {
  display: none;
}
input[type='text']:focus,
input[type='number']:focus,
select:focus {
  border: 2px solid #a97fff;
  outline: none;
  background: #f3eaff;
}
input[readonly] {
  background: #f9f6ff;
  color: #b0b0b0;
}
select {
  background: #fafffd;
  padding-right: 2.5em;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
}
.submit-btn {
  background: linear-gradient(90deg, #ffe6e6 0%, #ffe9b3 100%);
  color: #a97fff;
  border: 2px solid #ffe9b3;
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
  box-shadow: 0 2px 8px #f7d8ff44;
}
.submit-btn:hover {
  background: #a97fff;
  color: #fff;
  border: 2px solid #a97fff;
}
.footer {
  width: 100vw;
  background: #f9f6ff;
  color: #7d5fa6;
  border-top: 2px solid #ffe9b3;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0;
  z-index: 10;
}
.footer-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 16px 0 10px 0;
  flex-wrap: wrap;
}
.footer-person {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.05rem;
  font-weight: 500;
}
.footer-role {
  color: #ffb3b3;
  font-weight: 700;
  margin-right: 2px;
}
.footer-name {
  color: #a97fff;
  font-weight: 600;
}
.footer-phone {
  color: #7d5fa6;
  font-size: 0.98rem;
}
.footer-email {
  color: #7d5fa6;
  font-size: 0.98rem;
  font-weight: 500;
}
.footer-sep {
  color: #ffe9b3;
  margin: 0 6px;
  font-weight: 400;
}
.footer svg {
  filter: drop-shadow(0 1px 0 #ffe9b3);
}
@media (max-width: 900px) {
  .fund-bg {
    padding-bottom: 125px;
  }
  .fund-card {
    width: 90vw;
    max-width: 98vw;
    padding: 30px;
  }
  .form-title-main {
    font-size: 1.3rem;
  }
  .footer-content {
    display: flex;
    gap: 8px;
    padding: 10px 0 6px 0;
    justify-content: center;
    align-items: center;
  }
  .footer-person {
    font-size: 0.98rem;
    gap: 13px;
    align-items: center;
  }
}
.helper-text {
  font-size: 0.98rem;
  color: #ffb3b3;
  margin-top: 4px;
  margin-left: 2px;
}
</style>
