if [ ! -f *.blue.conf ]; then
 echo "Change Green to Blue"
 rename -v conf.bak conf.wait *.bak
 rename -v conf conf.bak *.conf
 rename -v conf.wait conf *.conf.wait
else
 echo "Already Blue applied" 
fi

nginx -s reload