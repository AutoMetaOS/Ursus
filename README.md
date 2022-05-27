# Ursus Maritimus

<div align="center">
<img src="https://api.nukes.in/cms/icon?name=amos:ursus.svg" alt="amos" width="300px" height="300px"/>
</div>

## File Structure
```
root
├── railway: Frontier API
├── samos: Super-AMOS API
└── test: Tests
    └── amos: Super-AMOS Tests
    └── server: Express Server: For bypass tests
    └── playground: Random Trials
    └── src, components: Svelte Prebuilt Components
```

## Planned
- Use Proxy API to create object such that when object property is fetched it is returned from cache. If not in cache it is fetched and returned
- Make DOCS