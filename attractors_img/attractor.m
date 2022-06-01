clc;
close all;

from = csvread('./38,52,155,211/from_38_n15.txt');
to = csvread('./38,52,155,211/to_38_n15.txt');

%disp(from);

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};