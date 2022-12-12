import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
import { useMemo } from 'react'
import { FC, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { isArrayEmpty } from 'helper'

interface Props {
  isNumber?: boolean
  value?: string[]
  onChange: (value: string[]) => void
}

const MultiInput: FC<Props> = ({ onChange, value, isNumber = true }) => {
  const initialValue = useMemo(() => [{ key: '0', value: '' }], [])
  const [inputs, setInputs] = useState<{ key: string; value: string }[]>(initialValue)

  const add = async () => {
    if (inputs[inputs.length - 1].value) {
      onChange([...inputs.map((item) => item.value), ''])
      setInputs((prev) => [...prev, { key: (parseInt(prev[prev.length - 1].key) + 1).toString(), value: '' }])
    }
  }

  const remove = async (key: string) => {
    onChange(inputs.filter((item) => item.key !== key).map((item) => item.value))
    setInputs(inputs.filter((item) => item.key !== key))
  }

  useEffect(() => {
    setInputs(
      value && !isArrayEmpty(value) ? value.map((item, index) => ({ key: index.toString(), value: item })) : initialValue
    )
  }, [initialValue, value])

  return (
    <div style={{ width: '100%', height: 33 + inputs.length * 42 }}>
      {inputs.map((input, index) => (
        <div style={{ display: 'flex', margin: '2px 0 10px 0' }} key={input.key}>
          <span style={{ lineHeight: '32px' }}>
            {isNumber ? `第${parseInt(input.key) + 1}个：` : `${String.fromCharCode(parseInt(input.key) + 65)}：`}
          </span>
          <div style={{ width: 296, display: 'flex' }}>
            <Input
              placeholder='请填入后再新增'
              value={input.value}
              onChange={(e) =>
                setInputs(inputs.map((item) => (item.key === input.key ? { key: input.key, value: e.target.value } : item)))
              }
              onBlur={() => {
                onChange(inputs.map((item) => item.value))
              }}
            />
          </div>

          {index !== 0 && (
            <MinusCircleOutlined
              style={{ position: 'relative', top: 4, margin: '0 8px', color: '#999', fontSize: 24, cursor: 'pointer' }}
              onClick={() => {
                remove(input.key)
              }}
            />
          )}
        </div>
      ))}
      {(isNumber || inputs.length < 4) && (
        <Button type='dashed' onClick={() => add()} style={{ width: 352 }} icon={<PlusOutlined />}>
          新增
        </Button>
      )}
    </div>
  )
}

export { MultiInput }
