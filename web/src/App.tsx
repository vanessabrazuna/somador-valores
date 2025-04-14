import { useState } from 'react'
import { api } from './lib/axios'

export function App() {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [result, setResult] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await api.post('/somar', {
        firstValue: Number(firstValue),
        secondValue: Number(secondValue),
      })

      setResult(response.data.result)
      alert(`Resultado: ${response.data.result}`)
    } catch (error: any) {
      console.error('Erro:', error)
      alert(error.response?.data?.error || 'Erro ao calcular a soma.')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <form
        onSubmit={handleSubmit}
        className="w-100 p-4 p-sm-5 rounded-4 shadow bg-white"
        style={{ maxWidth: '700px' }}
      >
        <h2 className="text-center mb-4 fw-bold">Somador de Valores</h2>

        <div className="mb-3">
          <label htmlFor="firstValue" className="form-label fw-semibold">
            Primeiro Valor
          </label>
          <input
            id="firstValue"
            type="number"
            className="form-control form-control-lg text-center"
            placeholder="Digite o primeiro valor"
            value={firstValue}
            onChange={(e) => setFirstValue(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="secondValue" className="form-label fw-semibold">
            Segundo Valor
          </label>
          <input
            id="secondValue"
            type="number"
            className="form-control form-control-lg text-center"
            placeholder="Digite o segundo valor"
            value={secondValue}
            onChange={(e) => setSecondValue(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 btn-lg">
          Enviar
        </button>

        {result !== null && (
          <div className="mt-4 alert alert-info">Resultado: {result}</div>
        )}
      </form>
    </div>
  )
}
