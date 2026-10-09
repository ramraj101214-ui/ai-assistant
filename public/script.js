document.addEventListener('DOMContentLoaded', () => {
  const templateSelect = document.getElementById('templateSelect');
  const dynamicInputsContainer = document.getElementById('dynamicInputs');
  const generateBtn = document.getElementById('generateBtn');
  const responseFeed = document.getElementById('responseFeed');
  const emptyState = document.getElementById('emptyState');

  let currentTemplate = '';
  let currentVariables = [];

  // Parse variables from template string like [Variable]
  const parseVariables = (template) => {
    const regex = /\[(.*?)\]/g;
    const matches = [...template.matchAll(regex)];
    return matches.map(match => match[1]);
  };

  // Handle template selection
  templateSelect.addEventListener('change', (e) => {
    currentTemplate = e.target.value;
    currentVariables = parseVariables(currentTemplate);
    
    // Clear previous inputs
    dynamicInputsContainer.innerHTML = '';
    
    if (currentVariables.length > 0) {
      currentVariables.forEach(variable => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col gap-1';
        
        const label = document.createElement('label');
        label.textContent = variable;
        label.className = 'text-xs text-gray-400 uppercase tracking-wide font-semibold';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Enter ${variable}...`;
        input.className = 'bg-bg-base border border-border-input rounded-md p-2 text-text-primary focus:outline-none text-sm variable-input';
        input.dataset.variable = variable;
        
        input.addEventListener('input', checkInputs);
        
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        dynamicInputsContainer.appendChild(wrapper);
      });
    } else {
      dynamicInputsContainer.innerHTML = '<p class="text-sm text-gray-400">No variables found in template.</p>';
    }
    
    checkInputs();
  });

  const checkInputs = () => {
    generateBtn.disabled = !currentTemplate;
  };

  // Compile final prompt
  const compilePrompt = () => {
    let finalPrompt = currentTemplate;
    const inputs = document.querySelectorAll('.variable-input');
    
    inputs.forEach(input => {
      const variable = input.dataset.variable;
      const value = input.value || `[${variable}]`;
      finalPrompt = finalPrompt.replace(`[${variable}]`, value);
    });
    
    return finalPrompt;
  };

  // Create card UI compliant with design system
  const createCard = (id, promptSnippet) => {
    const card = document.createElement('div');
    card.id = id;
    // Applied .card standard component class
    card.className = 'card p-5 relative flex flex-col gap-4 animate-fade-in transition-all';
    
    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center border-b border-border-input pb-3';
    header.innerHTML = `
      <span class="text-xs text-text-primary font-mono truncate pr-4 max-w-lg bg-bg-base px-3 py-1 rounded border border-border-input" title="${promptSnippet}">> ${promptSnippet}</span>
      <div class="flex gap-2">
        <button class="copy-btn text-gray-400 hover:text-text-primary transition-colors p-1" title="Copy to clipboard">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
        <button class="delete-btn text-gray-400 hover:text-red-400 transition-colors p-1" title="Delete card">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    `;
    
    // Body (Initially loading)
    const body = document.createElement('div');
    body.className = 'card-body text-text-primary text-sm whitespace-pre-wrap leading-relaxed min-h-[60px] flex items-center';
    body.innerHTML = `
      <div class="flex items-center gap-3 text-text-primary text-sm font-medium">
        <div class="loader"></div>
        Generating response...
      </div>
    `;
    
    card.appendChild(header);
    card.appendChild(body);
    
    // Copy button handler
    const copyBtn = header.querySelector('.copy-btn');
    const deleteBtn = header.querySelector('.delete-btn');
    
    copyBtn.addEventListener('click', () => {
      const content = card.dataset.content;
      if (content) {
        navigator.clipboard.writeText(content);
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
        setTimeout(() => {
          copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>';
        }, 2000);
      }
    });
    
    // Delete button handler
    deleteBtn.addEventListener('click', () => {
      card.remove();
      if (responseFeed.querySelectorAll('.card').length === 0) {
        emptyState.style.display = 'block';
      }
    });
    
    return card;
  };

  // Generate action
  generateBtn.addEventListener('click', async () => {
    const finalPrompt = compilePrompt();
    
    if (emptyState) emptyState.style.display = 'none';
    
    const cardId = 'card_' + Date.now();
    const card = createCard(cardId, finalPrompt);
    
    responseFeed.insertBefore(card, responseFeed.firstChild);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt })
      });
      
      const data = await response.json();
      
      const cardBody = card.querySelector('.card-body');
      if (response.ok) {
        cardBody.textContent = data.result;
        card.dataset.content = data.result;
        cardBody.classList.remove('items-center');
      } else {
        cardBody.innerHTML = `<span class="text-red-400">Error: ${data.error || 'Something went wrong'}</span>`;
      }
    } catch (error) {
      const cardBody = card.querySelector('.card-body');
      cardBody.innerHTML = '<span class="text-red-400">Error: Failed to connect to server</span>';
    }
  });
});