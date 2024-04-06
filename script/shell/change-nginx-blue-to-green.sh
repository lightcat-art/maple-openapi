if [ ! -f *.green.conf ]; then
 echo "Change Blue to Green"
 rename -v conf.bak conf.wait *.bak
 rename -v conf conf.bak *.conf
 rename -v conf.wait conf *.conf.wait
else
 echo "Already Green applied" 
fi

nginx -s reload
