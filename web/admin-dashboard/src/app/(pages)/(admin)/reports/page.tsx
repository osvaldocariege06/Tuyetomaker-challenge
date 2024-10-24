'use client'
import React, { useState } from 'react'

export type ReportData = {
  status: string;
  _count: number;
};

export default function Page() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  return (
    <div className='w-full flex-1 px-9 py-16'>
      <h1 className='text-3xl font-bold text-zinc-800'>Relatório de Consultas</h1>

      <div>
        <label htmlFor='start-date'>Data Inicial:</label>
        <input
          id='start-date'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor='end-date'>Data Final:</label>
        <input
          id='end-date'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type='button'>Gerar Relatório</button>
      </div>

      {/* Exibição do Relatório */}
      <div>
        <h2>Relatório por Status</h2>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.status}>
                <td>{item.status}</td>
                <td>{item._count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total de Consultas: {'totalAppointments'}</h3>
      </div>
    </div>
  )
}
