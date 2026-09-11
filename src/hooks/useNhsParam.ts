import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { isValidNhsNumber } from '../lib/nhsNumber'

export function useNhsParam(): string | null {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const nhs = params.get('nhs')
  const valid = !!nhs && isValidNhsNumber(nhs)

  useEffect(() => {
    if (!valid) {
      navigate('/', { replace: true })
    }
  }, [valid, navigate])

  return valid ? nhs : null
}
