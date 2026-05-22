import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api';

export default function ExcuseForm(){
  const [context, setContext] = useState('');
  const [scenario, setScenario] = useState('meeting');
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('en');
  const [result, setResult] = useState(null);
  const [proof, setProof] = useState(null);
  const [voice, setVoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    setError('');
    try{
      const res = await axios.post(`${API_BASE}/excuses`, { scenario, context, tone, language });
      setResult(res.data.excuse);
      setProof(null);
      setVoice(null);
    }catch(err){
      console.error(err);
      setError('Error generating excuse. Check backend status.');
    }finally{ setLoading(false); }
  }

  async function handleProof(){
    if(!result) return;
    try{
      const res = await axios.post(`${API_BASE}/proof`, { type: 'calendar', context: result.text });
      setProof(res.data.proof);
    }catch(err){
      console.error(err);
      setError('Error generating proof.');
    }
  }

  async function handleVoice(){
    if(!result) return;
    try{
      const res = await axios.post(`${API_BASE}/voice`, { text: result.text, language });
      setVoice(res.data.voice);
    }catch(err){
      console.error(err);
      setError('Error generating voice output.');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,maxWidth:760}}>
        <div style={{gridColumn:'1 / -1'}}>
          <label>Context / Reason</label>
          <input value={context} onChange={e=>setContext(e.target.value)} placeholder="e.g. I woke up sick" style={{width:'100%'}} />
        </div>
        <div>
          <label>Scenario</label>
          <select value={scenario} onChange={e=>setScenario(e.target.value)}>
            <option value="meeting">Meeting</option>
            <option value="class">Class</option>
            <option value="event">Event</option>
            <option value="interview">Interview</option>
            <option value="social">Social</option>
          </select>
        </div>
        <div>
          <label>Tone</label>
          <select value={tone} onChange={e=>setTone(e.target.value)}>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
          </select>
        </div>
        <div>
          <label>Language</label>
          <select value={language} onChange={e=>setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div style={{gridColumn:'1 / -1', display:'flex', gap:12}}>
          <button type="submit" disabled={loading}>{loading? 'Generating...' : 'Generate Excuse'}</button>
          <button type="button" onClick={handleProof} disabled={!result}>Generate Proof</button>
          <button type="button" onClick={handleVoice} disabled={!result}>Generate Voice</button>
        </div>
      </form>

      {error && <div style={{marginTop:12,color:'red'}}>{error}</div>}

      {result && (
        <div style={{marginTop:16,padding:12,border:'1px solid #ddd',borderRadius:6,maxWidth:760}}>
          <h3>Generated Excuse</h3>
          <p>{result.text}</p>
          <p><strong>Apology:</strong> {result.apology}</p>
          <small>Scenario: {result.scenario} · Tone: {tone} · Ranking: {result.ranking}</small>
        </div>
      )}

      {proof && (
        <div style={{marginTop:16,padding:12,border:'1px solid #cce',borderRadius:6,maxWidth:760}}>
          <h4>Proof Preview</h4>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
        </div>
      )}

      {voice && (
        <div style={{marginTop:16,padding:12,border:'1px solid #cce',borderRadius:6,maxWidth:760}}>
          <h4>Voice Output</h4>
          <p>{voice.note}</p>
          {voice.ttsUrl && <audio controls src={voice.ttsUrl} />}
        </div>
      )}
    </div>
  )
}
