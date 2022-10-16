1) Seems to be working locally
2) Google api tutorial instructions mentioned on the lab and stackoverflow
3) 3+ hrs
4) Performance with cache disabled (measuring load time not finish time):
    - Baseline w/ css and js in head: size, 1.3 mb; load time 2.86 s
    - moving js to before ending body: size, 1.3mb; load time 2.48 s
    - moving css before the name of the html head: size, 1.3 mb; load time 2.35 s
    - minified css (took out the html/body tag still takes up full screen): size, 1.2 mb; load time 2.33 s 
    -with cache enabled: size 1.2 mb; load time, 1.76 s