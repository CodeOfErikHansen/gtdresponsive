Spring Security Checklist
- [ ] CSRF Protection
- [ ] Cache control is on by default. I think I need to loosen this to be a PWA. 
- [ ] Content sniffing is on by default. I need to specify content-type in my fetches
- [ ] HSTS is fascinating and I need to read more about it
- [ ] The fuck is click jacking and how does it work?(X Frame Options) frames disabled by default, good
- [ ] good: reflected xss is blocked by default
- [ ] clear site data is good for log out
- [ ] Refer to 1.1.3 about HTTPS not being supported by default? Weird...
- [ ] Am I a servlet or webflux? I think servlet if one of those options. Am I something else??
