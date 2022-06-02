clc;
close all;

from = csvread('./43,113/from_43_n15.txt');
to = csvread('./43,113/to_43_n15.txt');

%disp(from);

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};